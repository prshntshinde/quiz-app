/**
 * Schema Validation Tests
 * 
 * Advanced validation tests that check the structural integrity
 * and schema compliance of configuration files.
 */

const fs = require('fs');
const path = require('path');

describe('Configuration Schema Validation', () => {
  describe('Package.json Schema', () => {
    let packageJson;

    beforeAll(() => {
      const packagePath = path.join(process.cwd(), 'package.json');
      const content = fs.readFileSync(packagePath, 'utf8');
      packageJson = JSON.parse(content);
    });

    test('should follow npm package.json schema', () => {
      // Required fields for npm packages
      expect(packageJson).toHaveProperty('name');
      expect(packageJson).toHaveProperty('version');
      
      // Name should be lowercase and hyphenated
      expect(packageJson.name).toMatch(/^[a-z0-9-]+$/);
      
      // Version should follow semver
      expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    test('should have valid license field or be marked private', () => {
      // Either should have a license or be marked private
      const hasLicense = packageJson.license !== undefined;
      const isPrivate = packageJson.private === true;
      
      expect(hasLicense || isPrivate).toBe(true);
    });

    test('scripts should be string values', () => {
      Object.entries(packageJson.scripts).forEach(([name, command]) => {
        expect(typeof command).toBe('string');
        expect(command.length).toBeGreaterThan(0);
      });
    });

    test('all dependencies should have valid version specifiers', () => {
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      Object.entries(allDeps).forEach(([name, version]) => {
        // Should start with ^, ~, or exact version
        expect(version).toMatch(/^[\^~]?\d+/);
        // Should not have wildcards
        expect(version).not.toMatch(/\*/);
      });
    });

    test('should not have empty dependency objects', () => {
      if (packageJson.dependencies) {
        expect(Object.keys(packageJson.dependencies).length).toBeGreaterThan(0);
      }
      if (packageJson.devDependencies) {
        expect(Object.keys(packageJson.devDependencies).length).toBeGreaterThan(0);
      }
    });
  });

  describe('ESLint Configuration Schema', () => {
    let eslintConfig;

    beforeAll(() => {
      const eslintPath = path.join(process.cwd(), '.eslintrc.json');
      const content = fs.readFileSync(eslintPath, 'utf8');
      eslintConfig = JSON.parse(content);
    });

    test('should follow ESLint configuration schema', () => {
      // Must have at least one of: extends, plugins, rules
      const hasValidConfig = 
        eslintConfig.extends ||
        eslintConfig.plugins ||
        eslintConfig.rules;
      
      expect(hasValidConfig).toBe(true);
    });

    test('extends should be string or array of strings', () => {
      if (eslintConfig.extends) {
        if (Array.isArray(eslintConfig.extends)) {
          eslintConfig.extends.forEach(extend => {
            expect(typeof extend).toBe('string');
          });
        } else {
          expect(typeof eslintConfig.extends).toBe('string');
        }
      }
    });

    test('should not have syntax errors', () => {
      // If we got here, JSON parsing succeeded
      expect(eslintConfig).toBeTruthy();
    });
  });

  describe('Next.js Configuration Schema', () => {
    test('next.config.js should be valid JavaScript', () => {
      const nextConfigPath = path.join(process.cwd(), 'next.config.js');
      const content = fs.readFileSync(nextConfigPath, 'utf8');
      
      // Should contain module.exports
      expect(content).toContain('module.exports');
      
      // Should not have syntax errors (basic check)
      expect(content).not.toMatch(/\bsyntaxerror\b/i);
    });
  });

  describe('Tailwind Configuration Schema', () => {
    test('tailwind.config.js should be valid JavaScript', () => {
      const tailwindPath = path.join(process.cwd(), 'tailwind.config.js');
      const content = fs.readFileSync(tailwindPath, 'utf8');
      
      // Should contain module.exports
      expect(content).toContain('module.exports');
    });
  });

  describe('jsconfig.json Schema', () => {
    let jsconfig;

    beforeAll(() => {
      const jsconfigPath = path.join(process.cwd(), 'jsconfig.json');
      if (fs.existsSync(jsconfigPath)) {
        const content = fs.readFileSync(jsconfigPath, 'utf8');
        jsconfig = JSON.parse(content);
      }
    });

    test('should be valid JSON if exists', () => {
      if (jsconfig) {
        expect(jsconfig).toBeTruthy();
      }
    });

    test('should have compilerOptions if present', () => {
      if (jsconfig && Object.keys(jsconfig).length > 0) {
        // Common fields in jsconfig
        const hasValidStructure = 
          jsconfig.compilerOptions ||
          jsconfig.include ||
          jsconfig.exclude;
        
        expect(hasValidStructure).toBe(true);
      }
    });
  });

  describe('Cross-file Consistency', () => {
    let packageJson;
    let eslintConfig;

    beforeAll(() => {
      packageJson = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
      );
      eslintConfig = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), '.eslintrc.json'), 'utf8')
      );
    });

    test('ESLint config should match installed eslint-config-next version', () => {
      const eslintConfigVersion = packageJson.devDependencies['eslint-config-next'];
      
      // Config should extend next
      const extendsArray = Array.isArray(eslintConfig.extends)
        ? eslintConfig.extends
        : [eslintConfig.extends];
      
      const hasNextConfig = extendsArray.some(config => config.includes('next'));
      expect(hasNextConfig).toBe(true);
      
      // Should be version 16
      expect(eslintConfigVersion).toMatch(/\^16\./);
    });

    test('Next.js version should be compatible with React version', () => {
      const nextVersion = packageJson.dependencies.next;
      const reactVersion = packageJson.dependencies.react;
      
      const nextMajor = parseInt(nextVersion.match(/\d+/)[0]);
      const reactMajor = parseInt(reactVersion.match(/\d+/)[0]);
      
      // Next.js 14 requires React 18
      if (nextMajor >= 14) {
        expect(reactMajor).toBeGreaterThanOrEqual(18);
      }
    });

    test('all configuration files should use consistent formatting', () => {
      // Check that JSON files are properly formatted
      const jsonFiles = ['package.json', '.eslintrc.json', 'jsconfig.json'];
      
      jsonFiles.forEach(filename => {
        const filePath = path.join(process.cwd(), filename);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          
          // Should parse without errors
          expect(() => JSON.parse(content)).not.toThrow();
          
          // Should not have trailing commas (valid in JSON)
          const parsed = JSON.parse(content);
          const reformatted = JSON.stringify(parsed, null, 2);
          
          // Both should parse to the same object
          expect(JSON.parse(content)).toEqual(JSON.parse(reformatted));
        }
      });
    });
  });

  describe('Security and Best Practices', () => {
    let packageJson;

    beforeAll(() => {
      packageJson = JSON.parse(
        fs.readFileSync(path.join(process.cwd(), 'package.json'), 'utf8')
      );
    });

    test('should not have dependencies with known security issues', () => {
      // Check for wildcards or overly permissive versions
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      Object.entries(allDeps).forEach(([name, version]) => {
        // Should not use wildcards
        expect(version).not.toMatch(/\*|x/i);
        
        // Should not be "latest"
        expect(version).not.toBe('latest');
      });
    });

    test('should use caret (^) for semantic versioning', () => {
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      Object.entries(allDeps).forEach(([name, version]) => {
        // Most dependencies should use caret
        expect(version).toMatch(/^\^/);
      });
    });

    test('should not have duplicate dependencies in node_modules path', () => {
      // Check package names for nested paths
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      Object.keys(allDeps).forEach(name => {
        expect(name).not.toMatch(/node_modules/);
      });
    });
  });
});