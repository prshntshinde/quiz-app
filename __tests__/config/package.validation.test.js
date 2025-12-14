/**
 * Configuration Validation Tests
 * 
 * These tests validate the package.json configuration and ensure
 * that dependencies are properly specified and compatible.
 */

const fs = require('fs');
const path = require('path');

describe('package.json Configuration Validation', () => {
  let packageJson;

  beforeAll(() => {
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageContent = fs.readFileSync(packagePath, 'utf8');
    packageJson = JSON.parse(packageContent);
  });

  describe('Basic Structure', () => {
    test('should have required fields', () => {
      expect(packageJson).toHaveProperty('name');
      expect(packageJson).toHaveProperty('version');
      expect(packageJson).toHaveProperty('scripts');
      expect(packageJson).toHaveProperty('dependencies');
      expect(packageJson).toHaveProperty('devDependencies');
    });

    test('should have valid name', () => {
      expect(packageJson.name).toBe('quiz-app');
      expect(typeof packageJson.name).toBe('string');
      expect(packageJson.name.length).toBeGreaterThan(0);
    });

    test('should have valid version', () => {
      expect(packageJson.version).toBe('0.1.0');
      expect(packageJson.version).toMatch(/^\d+\.\d+\.\d+$/);
    });

    test('should be marked as private', () => {
      expect(packageJson.private).toBe(true);
    });
  });

  describe('Scripts Configuration', () => {
    test('should have all required Next.js scripts', () => {
      expect(packageJson.scripts).toHaveProperty('dev');
      expect(packageJson.scripts).toHaveProperty('build');
      expect(packageJson.scripts).toHaveProperty('start');
      expect(packageJson.scripts).toHaveProperty('lint');
    });

    test('dev script should use next dev', () => {
      expect(packageJson.scripts.dev).toBe('next dev');
    });

    test('build script should use next build', () => {
      expect(packageJson.scripts.build).toBe('next build');
    });

    test('start script should use next start', () => {
      expect(packageJson.scripts.start).toBe('next start');
    });

    test('lint script should use next lint', () => {
      expect(packageJson.scripts.lint).toBe('next lint');
    });
  });

  describe('Dependencies', () => {
    test('should have Next.js as dependency', () => {
      expect(packageJson.dependencies).toHaveProperty('next');
    });

    test('should have React as dependency', () => {
      expect(packageJson.dependencies).toHaveProperty('react');
      expect(packageJson.dependencies).toHaveProperty('react-dom');
    });

    test('React and React-DOM should have matching versions', () => {
      expect(packageJson.dependencies.react).toBe(packageJson.dependencies['react-dom']);
    });

    test('should have UI dependencies', () => {
      expect(packageJson.dependencies).toHaveProperty('lucide-react');
      expect(packageJson.dependencies).toHaveProperty('react-icons');
    });

    test('should have styling dependencies', () => {
      expect(packageJson.dependencies).toHaveProperty('clsx');
      expect(packageJson.dependencies).toHaveProperty('tailwind-merge');
      expect(packageJson.dependencies).toHaveProperty('class-variance-authority');
    });

    test('should have database dependencies', () => {
      expect(packageJson.dependencies).toHaveProperty('mongoose');
    });

    test('all dependency versions should be valid', () => {
      Object.entries(packageJson.dependencies).forEach(([name, version]) => {
        expect(version).toMatch(/^[\^~]?\d+\.\d+\.\d+/);
      });
    });
  });

  describe('DevDependencies', () => {
    test('should have ESLint configuration', () => {
      expect(packageJson.devDependencies).toHaveProperty('eslint');
      expect(packageJson.devDependencies).toHaveProperty('eslint-config-next');
    });

    test('eslint-config-next should be upgraded to v16', () => {
      const version = packageJson.devDependencies['eslint-config-next'];
      expect(version).toMatch(/\^16\./);
      expect(version).toBe('^16.0.10');
    });

    test('should have PostCSS and Autoprefixer', () => {
      expect(packageJson.devDependencies).toHaveProperty('postcss');
      expect(packageJson.devDependencies).toHaveProperty('autoprefixer');
    });

    test('should have Tailwind CSS', () => {
      expect(packageJson.devDependencies).toHaveProperty('tailwindcss');
    });

    test('should have file-loader', () => {
      expect(packageJson.devDependencies).toHaveProperty('file-loader');
    });

    test('all devDependency versions should be valid', () => {
      Object.entries(packageJson.devDependencies).forEach(([name, version]) => {
        expect(version).toMatch(/^[\^~]?\d+/);
      });
    });
  });

  describe('Version Compatibility', () => {
    test('Next.js version should be compatible with React version', () => {
      const nextVersion = packageJson.dependencies.next;
      const reactVersion = packageJson.dependencies.react;
      
      // Next.js 14+ requires React 18+
      expect(nextVersion).toMatch(/\^14\./);
      expect(reactVersion).toMatch(/\^18\./);
    });

    test('eslint-config-next version should be compatible with Next.js', () => {
      const nextVersion = packageJson.dependencies.next;
      const eslintConfigVersion = packageJson.devDependencies['eslint-config-next'];
      
      // eslint-config-next 16 is compatible with Next.js 14+
      expect(nextVersion).toMatch(/\^14\./);
      expect(eslintConfigVersion).toMatch(/\^16\./);
    });

    test('ESLint version should be compatible with eslint-config-next', () => {
      const eslintVersion = packageJson.devDependencies.eslint;
      const eslintConfigVersion = packageJson.devDependencies['eslint-config-next'];
      
      // eslint-config-next 16 requires ESLint 8
      expect(eslintVersion).toMatch(/\^8/);
      expect(eslintConfigVersion).toMatch(/\^16\./);
    });
  });

  describe('Configuration Integrity', () => {
    test('should not have duplicate dependencies', () => {
      const allDeps = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies
      };
      
      const depNames = Object.keys(allDeps);
      const uniqueDepNames = new Set(depNames);
      
      expect(depNames.length).toBe(uniqueDepNames.size);
    });

    test('should not have conflicting version specifications', () => {
      // Ensure no dependency appears in both dependencies and devDependencies
      const depKeys = Object.keys(packageJson.dependencies);
      const devDepKeys = Object.keys(packageJson.devDependencies);
      
      const intersection = depKeys.filter(key => devDepKeys.includes(key));
      expect(intersection).toHaveLength(0);
    });
  });
});