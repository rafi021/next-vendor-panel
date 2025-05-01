import { cookies } from 'next/headers';

const isLocal = process.env.NODE_ENV === 'development';

type CookieValueDef = {
  key: string;
  value: string;
  duration: Date | string;
};

/**
 *  @param duration The type of duration must be Date format
 */
export const storeMultipleCookies = async (data: CookieValueDef[]) => {
  const cookieStore = await cookies();

  data.map((d) => {
    const date = new Date(d.duration as Date);
    const now = new Date();

    const diffInMillis = date.getTime() - now.getTime();
    const diffInSeconds = Math.floor(diffInMillis / 1000);

    // cookieStore.set(d.key, d.value, {
    //   maxAge: diffInSeconds ?? 6 * 60 * 60,
    //   secure: true,
    //   httpOnly: true,
    //   sameSite: 'none',
    //   path: '/',
    // });

    cookieStore.set(d.key, d.value, {
      maxAge: diffInSeconds ?? 6 * 60 * 60,
      secure: !isLocal, // Only secure in prod
      httpOnly: true,
      sameSite: isLocal ? 'lax' : 'none',
      path: '/',
    });
  });
};
