// // pages/api/auth/[...nextauth].ts
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import axios from "axios";

// export default NextAuth({
//   providers: [
//     CredentialsProvider({
//       name: "Credentials",
//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         try {
//           const res = await axios.post("http://localhost:5000/api/login", {
//             email: credentials?.email,
//             password: credentials?.password,
//           });
//           const user = res.data;
//           if (user && user.token) {
//             return user;
//           }
//           return null;
//         } catch (error) {
//           console.error("Login error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   session: { strategy: "jwt" },
//   jwt: { secret: process.env.JWT_SECRET },
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token.accessToken = user.token;
//         // Make sure to attach the role from your API response (adjust the path as needed)
//         token.role = user.user.role;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       session.user.role = token.role;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/auth/signin",
//   },
// });
