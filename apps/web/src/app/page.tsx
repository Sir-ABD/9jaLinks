import Link from 'next/link'

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
            {/* Navigation */}
            <nav className="glass fixed top-0 left-0 right-0 z-50">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-xl">9j</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-primary-700 to-accent-700 bg-clip-text text-transparent">
                                9jaLinks
                            </span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <Link href="#features" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Features
                            </Link>
                            <Link href="#about" className="text-gray-700 hover:text-primary-600 transition-colors">
                                About
                            </Link>
                            <Link href="/login" className="text-gray-700 hover:text-primary-600 transition-colors">
                                Login
                            </Link>
                            <Link href="/register" className="btn-primary">
                                Get Started
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center animate-fade-in">
                        <h1 className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary-700 via-accent-600 to-primary-700 bg-clip-text text-transparent animate-slide-up">
                            Connect. Shop. Thrive.
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
                            Your premier marketplace for connecting buyers and sellers across Nigeria.
                            Experience seamless shopping with personalized recommendations.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/register" className="btn-primary text-lg px-8 py-4">
                                Start Shopping
                            </Link>
                            <Link href="/vendor" className="btn-secondary text-lg px-8 py-4">
                                Become a Vendor
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-primary-700 to-accent-700 bg-clip-text text-transparent">
                        Why Choose 9jaLinks?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="card group hover:scale-105 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">Lightning Fast</h3>
                            <p className="text-gray-600">
                                Experience blazing-fast performance with our optimized platform. Browse thousands of products instantly.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="card group hover:scale-105 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-accent-500 to-primary-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">Secure & Trusted</h3>
                            <p className="text-gray-600">
                                Your data and transactions are protected with enterprise-grade security. Shop with confidence.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="card group hover:scale-105 transition-transform duration-300">
                            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-3 text-gray-800">AI-Powered</h3>
                            <p className="text-gray-600">
                                Get personalized product recommendations tailored to your preferences using advanced AI technology.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-6">
                <div className="max-w-4xl mx-auto">
                    <div className="card bg-gradient-to-r from-primary-600 to-accent-600 text-white text-center">
                        <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of satisfied customers and vendors on 9jaLinks today.
                        </p>
                        <Link href="/register" className="inline-block px-8 py-4 bg-white text-primary-700 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200">
                            Create Your Account
                        </Link>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-4 gap-8 mb-8">
                        <div>
                            <h3 className="text-xl font-bold mb-4">9jaLinks</h3>
                            <p className="text-gray-400">
                                Connecting Nigeria, one link at a time.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Product</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="#" className="hover:text-white transition-colors">Features</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Pricing</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">FAQ</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Company</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold mb-4">Legal</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li><Link href="#" className="hover:text-white transition-colors">Privacy</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Terms</Link></li>
                                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
                        <p>&copy; 2025 9jaLinks. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </main>
    )
}
