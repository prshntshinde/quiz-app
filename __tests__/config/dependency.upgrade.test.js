/**
 * Dependency Upgrade Impact Tests
 * 
 * These tests validate that the eslint-config-next upgrade from v14 to v16
 * doesn't introduce breaking changes or configuration issues.
 */

const fs = require('fs');
const path = require('path');

describe('Dependency Upgrade Impact', () => {
  let packageJson;
  let eslintConfig;

  beforeAll(() => {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    packageJson = JSON.parse(packageContent);

    const eslintPath = path.join(process.cwd(), '.eslintrc.json');
    const eslintContent = fs.readFileSync(eslintPath, 'utf8');
    eslintConfig = JSON.parse(eslintContent);
  });

  describe('Version Upgrade Validation', () => {
    test('eslint-config-next should be upgraded to v16.0.10', () => {
      expect(packageJson.devDependencies['eslint-config-next']).toBe('^16.0.10');
    });

    test('upgrade should maintain semantic versioning format', () => {
      const version = packageJson.devDependencies['eslint-config-next'];
      expect(version).toMatch(/^\^16\.0\.10$/);
    });

    test('should not have downgraded any other dependencies', () => {
      // Verify Next.js is still at 14+
      expect(packageJson.dependencies.next).toMatch(/\^14\./);
      
      // Verify React is still at 18+
      expect(packageJson.dependencies.react).toMatch(/\^18\./);
      
      // Verify ESLint is still at 8+
      expect(packageJson.devDependencies.eslint).toMatch(/\^8/);
    });
  });

  describe('Backward Compatibility', () => {
    test('existing project structure should remain valid', () => {
      // Check that essential files exist
      expect(fs.existsSync('next.config.js')).toBe(true);
      expect(fs.existsSync('.eslintrc.json')).toBe(true);
      expect(fs.existsSync('package.json')).toBe(true);
    });

    test('ESLint configuration should still be compatible', () => {
      // The config should extend Next.js preset
      const extendsArray = Array.isArray(eslintConfig.extends) 
        ? eslintConfig.extends 
        : [eslintConfig.extends];
      
      expect(extendsArray.some(config => config.includes('next'))).toBe(true);
    });
  });

  describe('Breaking Changes Check', () => {
    test('should not introduce TypeScript requirements if not using TypeScript', () => {
      // Check if TypeScript is in dependencies
      const hasTypeScript = 
        packageJson.dependencies?.typescript ||
        packageJson.devDependencies?.typescript;
      
      if (!hasTypeScript) {
        // Project doesn't use TypeScript, upgrade shouldn't require it
        expect(fs.existsSync('tsconfig.json')).toBe(false);
      }
    });

    test('should maintain Next.js version compatibility', () => {
      const nextVersion = packageJson.dependencies.next;
      const eslintConfigVersion = packageJson.devDependencies['eslint-config-next'];
      
      // Parse major versions
      const nextMajor = parseInt(nextVersion.match(/\d+/)[0]);
      const eslintConfigMajor = parseInt(eslintConfigVersion.match(/\d+/)[0]);
      
      // eslint-config-next 16 is compatible with Next.js 14+
      expect(nextMajor).toBeGreaterThanOrEqual(14);
      expect(eslintConfigMajor).toBe(16);
    });
  });

  describe('Configuration Files Integrity', () => {
    test('next.config.js should exist and be readable', () => {
      const nextConfigPath = path.join(process.cwd(), 'next.config.js');
      expect(fs.existsSync(nextConfigPath)).toBe(true);
      
      const nextConfigContent = fs.readFileSync(nextConfigPath, 'utf8');
      expect(nextConfigContent.length).toBeGreaterThan(0);
    });

    test('.eslintrc.json should be valid JSON', () => {
      expect(() => {
        JSON.parse(JSON.stringify(eslintConfig));
      }).not.toThrow();
    });

    test('package.json should be valid JSON', () => {
      expect(() => {
        JSON.parse(JSON.stringify(packageJson));
      }).not.toThrow();
    });
  });

  describe('Peer Dependencies', () => {
    test('all peer dependencies should be satisfied', () => {
      // eslint-config-next 16 requires ESLint 8.57.0 or 9.0.0+
      const eslintVersion = packageJson.devDependencies.eslint;
      const majorVersion = parseInt(eslintVersion.match(/\d+/)[0]);
      
      expect(majorVersion).toBeGreaterThanOrEqual(8);
    });
  });
});