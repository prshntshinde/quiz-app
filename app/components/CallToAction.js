"use client";
import React from "react";
import Link from "next/link";

const CallToAction = () => {
    return (
        <section className="relative py-20 sm:py-28 overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600">
                {/* Animated pattern overlay */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>
            </div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <div className="space-y-8 animate-fade-in">
                    {/* Heading */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white">
                        Ready to Test Your Knowledge?
                    </h2>

                    {/* Subtext */}
                    <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto leading-relaxed">
                        Join thousands of learners challenging themselves every day.
                        Start your first quiz now and discover what you know!
                    </p>

                    {/* CTA Button */}
                    <div className="pt-4">
                        <Link
                            href="/quiz"
                            className="group inline-flex items-center justify-center px-10 py-5 text-lg font-bold text-purple-700 bg-white rounded-xl hover:bg-gray-50 transform hover:scale-105 transition-all duration-300 ease-out shadow-2xl hover:shadow-3xl"
                        >
                            <span className="flex items-center gap-3">
                                <span>Get Started</span>
                                <svg
                                    className="w-6 h-6 transform group-hover:translate-x-2 transition-transform duration-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                                    />
                                </svg>
                            </span>
                        </Link>
                    </div>

                    {/* Optional: Small trust indicator */}
                    <p className="text-sm text-purple-200 pt-4">
                        No registration required • Start immediately • Free to use
                    </p>
                </div>
            </div>
        </section>
    );
};

export default CallToAction;
