import { getClient } from "gql/client";
import ThemeRegistry from "components/ThemeRegistry/ThemeRegistry";
import { fontClass } from "components/ThemeRegistry/typography";
import Progressbar from "components/Progressbar";
import LocalizationWrapper from "components/LocalizationWrapper";
import { AuthProvider } from "components/AuthProvider";
import { GET_USER } from "gql/queries/auth";
import { GET_CLUB } from "gql/queries/clubs";
import Toast, { ToastProvider } from "components/Toast";
import { Navigation, Content } from "components/Layout";
import TransitionProvider from "components/TransitionProvider";

const CLUB_ID = process.env.NEXT_PUBLIC_CLUB_ID || "nss";

export const metadata = {
  title: 'National Service Scheme',
  description: 'Nss: contributing to nation',
}

export default async function RootLayout({ children }) {
  const { data: { userMeta, userProfile } = {} } = await getClient().query(
    GET_USER,
    { userInput: null }
  );

  const user = { ...userMeta, ...userProfile };

  const { data: { club } = {} } = await getClient().query(GET_CLUB, {
    clubInput: { cid: CLUB_ID },
  });

  return (
    <html lang="en">
      <body className={fontClass}>
        <ThemeRegistry>
          <Progressbar />
          <LocalizationWrapper>
            <AuthProvider user={user}>
              <ToastProvider>
                <Navigation />
                <Content club={club}>
                  <TransitionProvider>
                    {children}
                  </TransitionProvider>
                </Content>
                <Toast />
              </ToastProvider>
            </AuthProvider>
          </LocalizationWrapper>
        </ThemeRegistry>
      </body>
    </html>
  )
}
