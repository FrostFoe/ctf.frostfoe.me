"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Eye, EyeOff, Github, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="mb-8 flex justify-center"
      >
        <img
          src="/flag-wave.gif"
          alt="Google CTF Flag"
          width={80}
          height={80}
          className="h-20 w-auto"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-border/40 bg-card/95 p-8 backdrop-blur">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 text-center text-2xl font-bold text-foreground"
          >
            Create Your Account
          </motion.h1>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Email Field */}
            <motion.div variants={staggerItem} className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-foreground"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="off"
                required
                autoFocus
                placeholder="Enter your email"
                className="w-full rounded-md border border-border/50 bg-background/50 px-4 py-2 text-foreground placeholder-muted-foreground transition-colors hover:border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
              />
            </motion.div>

            {/* Password Field */}
            <motion.div variants={staggerItem} className="space-y-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-foreground"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="off"
                  required
                  placeholder="Create a password"
                  className="w-full rounded-md border border-border/50 bg-background/50 px-4 py-2 pr-12 text-foreground placeholder-muted-foreground transition-colors hover:border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Confirm Password Field */}
            <motion.div variants={staggerItem} className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-foreground"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="off"
                  required
                  placeholder="Confirm your password"
                  className="w-full rounded-md border border-border/50 bg-background/50 px-4 py-2 pr-12 text-foreground placeholder-muted-foreground transition-colors hover:border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <motion.button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </motion.button>
              </div>
            </motion.div>

            {/* Create Account Button */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                size="lg"
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </motion.div>
          </motion.form>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="my-8 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-border/40" />
            <span className="text-xs text-muted-foreground">
              Or sign up with
            </span>
            <div className="h-px flex-1 bg-border/40" />
          </motion.div>

          {/* Social Sign Up Buttons */}
          <motion.div
            className="space-y-3"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Google Button */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16.8426 6.54769C15.6036 5.36599 13.9501 4.72223 12.2392 4.74868C9.10863 4.74868 6.44981 6.86074 5.5018 9.70474V9.7048C4.99913 11.1952 4.99913 12.809 5.50179 14.2993H5.50619C6.45861 17.1389 9.11303 19.251 12.2437 19.251C13.8597 19.251 15.247 18.8376 16.3223 18.1076V18.1046C17.5878 17.2668 18.452 15.9484 18.721 14.4581H12.2393V9.8371H23.558C23.6991 10.6396 23.7653 11.4597 23.7653 12.2755C23.7653 15.9253 22.4609 19.0111 20.1913 21.1011L20.1937 21.1029C18.2051 22.9372 15.4757 23.9998 12.2392 23.9998C7.70204 23.9998 3.55286 21.4424 1.51575 17.3903V17.3902C-0.186243 13.9995 -0.186239 10.0046 1.51576 6.61386H1.51579L1.51575 6.61383C3.55286 2.55725 7.70204 -0.000167897 12.2392 -0.000167897C15.22 -0.0354426 18.0992 1.08453 20.2686 3.12164L16.8426 6.54769Z"
                    fill="currentColor"
                  />
                </svg>
                Sign up with Google
              </Button>
            </motion.div>

            {/* LinkedIn Button */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Linkedin className="mr-2 h-4 w-4" />
                Sign up with Linkedin
              </Button>
            </motion.div>

            {/* GitHub Button */}
            <motion.div
              variants={staggerItem}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="button"
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Github className="mr-2 h-4 w-4" />
                Sign up with Github
              </Button>
            </motion.div>
          </motion.div>

          {/* Sign In Link */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mt-8 text-center"
          >
            <span className="text-sm text-muted-foreground">
              Already have an account?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm font-medium text-primary hover:underline transition-colors"
            >
              Sign In
            </Link>
          </motion.div>
        </Card>
      </motion.div>
    </motion.div>
  );
}
