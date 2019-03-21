const fs = require('fs');

function flatten(array) {
  return array.reduce((flattened, currentElement) => {
    if (Array.isArray(currentElement)) {
      return [...flattened, ...flatten(currentElement)];
    }

    return [...flattened, currentElement];
  }, []);
}

function expandDirectories(basePath, filesAndDirectories) {
  return filesAndDirectories.map((fileOrDirectory) => {
    const relativePathToFileOrDirectory = basePath + '/' + fileOrDirectory;
    const stats = fs.statSync(relativePathToFileOrDirectory);

    if (stats.isDirectory()) {
      return findFiles(relativePathToFileOrDirectory);
    }

    return relativePathToFileOrDirectory;
  });
}

function findFiles(path) {
  const filesAndDirectories = fs.readdirSync(path);
  const publicFilesAndDirectories = filesAndDirectories.filter((path) => !path.startsWith('_'));
  const publicFiles = expandDirectories(path, publicFilesAndDirectories);
  return flatten(publicFiles);
}

const hrefs = findFiles('./pages')
  .map((file) => file.endsWith('/index.js') ? file.replace('/index.js', '/') : file.replace('.js', ''))
  .map((file) => file.replace('./pages', ''));

const pages = hrefs.reduce((pages, href) => ({
  ...pages,
  [href]: {
    page: href,
  },
}), {});

module.exports = {
  exportPathMap: () => pages,
};
