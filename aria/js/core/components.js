export const COMPONENT_PATHS = [
  'components/system-hud.html',
  'components/boot-disclaimer.html',
  'components/content-warning.html',
  'components/scene-shell.html',
  'components/story-select.html',
  'components/ending-screen.html',
  'components/final-report.html',
  'components/article-system.html',
];

export async function loadComponents() {
  const appShell = document.getElementById('app-shell');
  if (!appShell) {
    throw new Error('App shell not found.');
  }

  const componentMarkup = await Promise.all(
    COMPONENT_PATHS.map(async (path) => {
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Failed to load component: ${path}`);
      }
      return response.text();
    })
  );

  appShell.innerHTML = componentMarkup.join('\n');
}
