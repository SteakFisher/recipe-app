import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
    let res = NextResponse.next()

    if (req.nextUrl.pathname.includes(".")) {
        return res;
    }

    const supabase = createMiddlewareClient({ req, res });

    const { data: {session}} = await supabase.auth.getSession();

    if(!session && !(req.nextUrl.pathname == '/')) {
        res = NextResponse.redirect(new URL('/', req.url));
    } else if(session && req.nextUrl.pathname == '/') {
        res = NextResponse.redirect(new URL('/dashboard', req.url));
    }

    return res
}

export const config = {
    matcher: [
        '/((?!_next).*)',
    ],
}