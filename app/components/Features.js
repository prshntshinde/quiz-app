"use client";
import React from "react";

const features = [
    {
        icon: "🎯",
        title: "Diverse Topics",
        description:
            "Explore a wide range of quiz categories from science and history to pop culture and technology. There's something for everyone.",
    },
    {
        icon: "⚡",
        title: "Instant Results",
        description:
            "Get immediate feedback on your answers. Learn from your mistakes and understand the correct answers right away.",
    },
    {
        icon: "📊",
        title: "Track Progress",
        description:
            "Monitor your performance over time. See your improvement and identify areas where you can continue to grow.",
    },
];

const Features = () => {

    return (
        <section className="py-20 sm:py-28 bg-white dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        Why Choose Our Quiz App?
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Discover the features that make learning engaging and effective
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative animate-fade-in bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-out border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 overflow-hidden"
                            style={{
                                animationDelay: `${index * 100}ms`,
                            }}
                        >
                            {/* Glassmorphism overlay on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Glow effect */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>

                            {/* Content */}
                            <div className="relative">
                                {/* Icon */}
                                <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors duration-300">
                                    {feature.title}
                                </h3>

                                {/* Description */}
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>

                            {/* Decorative corner element */}
                            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
