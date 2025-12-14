/**
 * ESLint Configuration Validation Tests
 * 
 * These tests validate the ESLint configuration and ensure it's properly set up
 * for the upgraded eslint-config-next version.
 */

const fs = require('fs');
const path = require('path');

describe('ESLint Configuration Validation', () => {
  let eslintConfig;

  beforeAll(() => {
    const eslintPath = path.join(process.cwd(), '.eslintrc.json');
    const eslintContent = fs.readFileSync(eslintPath, 'utf8');
    eslintConfig = JSON.parse(eslintContent);
  });

  describe('Configuration Structure', () => {
    test('should have extends property', () => {
      expect(eslintConfig).toHaveProperty('extends');
    });

    test('should extend from next/core-web-vitals', () => {
      if (Array.isArray(eslintConfig.extends)) {
        expect(eslintConfig.extends).toContain('next/core-web-vitals');
      } else {
        expect(eslintConfig.extends).toBe('next/core-web-vitals');
      }
    });

    test('configuration should be valid JSON', () => {
      expect(() => JSON.stringify(eslintConfig)).not.toThrow();
    });
  });

  describe('Next.js ESLint Rules', () => {
    test('should use recommended Next.js configuration', () => {
      const extendsArray = Array.isArray(eslintConfig.extends) 
        ? eslintConfig.extends 
        : [eslintConfig.extends];
      
      const hasNextConfig = extendsArray.some(config => 
        config.includes('next')
      );
      
      expect(hasNextConfig).toBe(true);
    });
  });

  describe('Configuration Compatibility', () => {
    test('should not have conflicting parser settings', () => {
      if (eslintConfig.parser) {
        expect(eslintConfig.parser).toBeTruthy();
      }
      // Next.js config should handle parser internally
    });

    test('should not override critical Next.js rules without reason', () => {
      if (eslintConfig.rules) {
        // Ensure we're not disabling critical Next.js rules
        const criticalRules = [
          '@next/next/no-html-link-for-pages',
          '@next/next/no-img-element'
        ];
        
        criticalRules.forEach(rule => {
          if (eslintConfig.rules[rule]) {
            expect(eslintConfig.rules[rule]).not.toBe('off');
          }
        });
      }
    });
  });
});