import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Маршруты, требующие аутентификации
const protectedPaths = [
  '/admin',
  '/dashboard',
  '/profile'
];

// Маршруты, доступные только администраторам
const adminPaths = [
  '/admin',
  '/projects/add',
  '/projects/edit',
  '/events/add',
  '/events/edit',
  '/articles/add',
  '/articles/edit'
];

// Маршруты, доступные только не аутентифицированным пользователям
const authPaths = [
  '/auth/signin',
  '/auth/signup'
];

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });
  
  const { pathname } = request.nextUrl;
  
  // Проверка доступа к защищенным маршрутам
  if (pathIsProtected(pathname)) {
    if (!token) {
      const url = new URL('/auth/signin', request.url);
      url.searchParams.set('callbackUrl', encodeURI(pathname));
      return NextResponse.redirect(url);
    }
  }
  
  // Проверка доступа к административным маршрутам
  if (pathIsAdmin(pathname)) {
    if (!token || (token.role !== 'admin' && token.name !== 'bakhanumi')) {
      // Если пользователь не админ, перенаправляем на главную
      return NextResponse.redirect(new URL('/', request.url));
    }
  }
  
  // Перенаправление аутентифицированных пользователей со страниц входа/регистрации
  if (pathIsAuth(pathname) && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }
  
  return NextResponse.next();
}

// Проверка, является ли путь защищенным
function pathIsProtected(path: string): boolean {
  return protectedPaths.some(prefix => path.startsWith(prefix));
}

// Проверка, является ли путь административным
function pathIsAdmin(path: string): boolean {
  return adminPaths.some(prefix => path.startsWith(prefix));
}

// Проверка, является ли путь страницей аутентификации
function pathIsAuth(path: string): boolean {
  return authPaths.some(prefix => path.startsWith(prefix));
}

export const config = {
  matcher: [
    // Защищенные пути
    '/admin/:path*',
    '/dashboard/:path*',
    '/profile/:path*',
    
    // Административные пути
    '/projects/add',
    '/projects/edit/:path*',
    '/events/add',
    '/events/edit/:path*',
    '/articles/add',
    '/articles/edit/:path*',
    
    // Страницы аутентификации
    '/auth/signin',
    '/auth/signup',
  ]
};
