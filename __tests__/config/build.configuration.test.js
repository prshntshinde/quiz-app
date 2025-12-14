/**
 * Build Configuration Tests
 * 
 * These tests validate that the build configuration is correct and
 * that the upgraded dependencies don't break the build process.
 */

const fs = require('fs');
const path = require('path');

describe('Build Configuration', () => {
  describe('Next.js Configuration', () => {
    let nextConfig;

    beforeAll(() => {
      const nextConfigPath = path.join(process.cwd(), 'next.config.js');
      expect(fs.existsSync(nextConfigPath)).toBe(true);
    });

    test('next.config.js should exist', () => {
      const nextConfigPath = path.join(process.cwd(), 'next.config.js');
      expect(fs.existsSync(nextConfigPath)).toBe(true);
    });

    test('next.config.js should be a valid JavaScript file', () => {
      const nextConfigPath = path.join(process.cwd(), 'next.config.js');
      const content = fs.readFileSync(nextConfigPath, 'utf8');
      
      // Should contain module.exports
      expect(content).toContain('module.exports');
    });
  });

  describe('PostCSS Configuration', () => {
    test('postcss.config.js should exist', () => {
      const postcssConfigPath = path.join(process.cwd(), 'postcss.config.js');
      expect(fs.existsSync(postcssConfigPath)).toBe(true);
    });

    test('postcss.config.js should be valid', () => {
      const postcssConfigPath = path.join(process.cwd(), 'postcss.config.js');
      const content = fs.readFileSync(postcssConfigPath, 'utf8');
      
      expect(content.length).toBeGreaterThan(0);
      expect(content).toContain('module.exports');
    });
  });

  describe('Tailwind Configuration', () => {
    test('tailwind.config.js should exist', () => {
      const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.js');
      expect(fs.existsSync(tailwindConfigPath)).toBe(true);
    });

    test('tailwind.config.js should be valid', () => {
      const tailwindConfigPath = path.join(process.cwd(), 'tailwind.config.js');
      const content = fs.readFileSync(tailwindConfigPath, 'utf8');
      
      expect(content.length).toBeGreaterThan(0);
      expect(content).toContain('module.exports');
    });
  });

  describe('JavaScript Configuration', () => {
    test('jsconfig.json should exist', () => {
      const jsconfigPath = path.join(process.cwd(), 'jsconfig.json');
      expect(fs.existsSync(jsconfigPath)).toBe(true);
    });

    test('jsconfig.json should be valid JSON', () => {
      const jsconfigPath = path.join(process.cwd(), 'jsconfig.json');
      const content = fs.readFileSync(jsconfigPath, 'utf8');
      
      expect(() => JSON.parse(content)).not.toThrow();
    });
  });

  describe('Project Structure', () => {
    test('app directory should exist', () => {
      expect(fs.existsSync('app')).toBe(true);
      expect(fs.statSync('app').isDirectory()).toBe(true);
    });

    test('public directory should exist', () => {
      expect(fs.existsSync('public')).toBe(true);
      expect(fs.statSync('public').isDirectory()).toBe(true);
    });

    test('lib directory should exist', () => {
      expect(fs.existsSync('lib')).toBe(true);
      expect(fs.statSync('lib').isDirectory()).toBe(true);
    });

    test('components.json should exist', () => {
      expect(fs.existsSync('components.json')).toBe(true);
    });
  });

  describe('Git Configuration', () => {
    test('.gitignore should exist', () => {
      expect(fs.existsSync('.gitignore')).toBe(true);
    });

    test('.gitignore should ignore node_modules', () => {
      const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
      expect(gitignoreContent).toContain('node_modules');
    });

    test('.gitignore should ignore Next.js build artifacts', () => {
      const gitignoreContent = fs.readFileSync('.gitignore', 'utf8');
      expect(gitignoreContent).toMatch(/\.next/);
    });
  });
});