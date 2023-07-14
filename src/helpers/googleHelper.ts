import { OAuth2Client } from'google-auth-library'

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID
const CLINET_SECRET = process.env.GOOGLE_CLIENT_SECRET
const RERIRECT_URL = 'http://localhost:4000/api/auth/login-by-google/callback'

export const client = new OAuth2Client({clientId: CLIENT_ID, clientSecret: CLINET_SECRET, redirectUri: RERIRECT_URL})

export const generateGGAuthURL = ():string => {
    const url = client.generateAuthUrl({
        access_type: 'offline',
        scope: 'email profile',
        redirect_uri: RERIRECT_URL
    })
    return url
}

export const verifyGoogle = async (authorizationCode:string) => {
    const tokenData = await client.getToken(authorizationCode)
    const {id_token} = tokenData.tokens
    const ticket = await client.verifyIdToken({
        idToken: String(id_token),
        audience: CLIENT_ID
    })

    const payload = ticket.getPayload()
    const name = payload?.name as string;
    const email = payload?.email as string;
    const picture = payload?.picture as string;
    return { email, name, picture }
}