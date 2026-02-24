import Link from "next/link";
export default function Login() {
  return (
    <>
      <div className="header">
        <div className="h-14 bg-emerald-800 display flex flex-row justify-between items-center px-3">
          <Link href="/"><div className="name text-2xl font-bold">KNN Recommendation system</div></Link>
          <div className="options flex flex-row gap-4">
            <Link href="/authentication/Login"><div className="Login">Login</div></Link>
            <Link href="/authentication/SignUp"><div className="Login">Sign Up</div></Link>
          </div>
        </div>
      </div>
        <main className="flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-md font-gmono border border-gray-300 rounded-lg p-8 shadow-md">
          <h1 className="text-3xl font-bold mb-8 text-center">Login</h1>
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-2">Username</label>
              <input type="text" id="username" name="username" className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-800" required/>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
              <input type="email" id="email" name="email" className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-800" required/>
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-2">Password</label>
              <input type="password" id="password" name="password"className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-emerald-800"required/>
            </div>
            <button type="submit" className="bg-emerald-800 text-white px-6 py-3 rounded-lg w-full font-medium hover:bg-emerald-900 transition-colors">
              Login
            </button>
          </form>
        </div>
      </main>
    </>
  );
}
