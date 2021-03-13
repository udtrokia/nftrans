// HOT RELOAD
// const reload = () => {
(() => {
  const timestampForFilesInDirectory = (dir: DirectoryEntry) =>
    filesInDirectory(dir).then((files: File[]) =>
      files.map((f) => f.name + f.lastModified).join()
    );

  const filesInDirectory = (dir: DirectoryEntry): Promise<File[]> =>
    new Promise((resolve) =>
      dir.createReader().readEntries((entries: Entry[]) =>
        Promise.all(
          entries
            .filter((e) => e.name[0] !== ".")
            .map((e) =>
              e.isDirectory
                ? filesInDirectory(e as DirectoryEntry)
                : new Promise((resolve) => (e as FileEntry).file(resolve))
            )
        )
          .then((files) => [].concat(...files))
          .then(resolve)
      )
    );

  const watchChanges = (dir: DirectoryEntry, lastTimestamp?: string) => {
    timestampForFilesInDirectory(dir).then((timestamp: string) => {
      if (!lastTimestamp || lastTimestamp === timestamp) {
        setTimeout(() => watchChanges(dir, timestamp), 1000); // retry after 1s
      } else {
        chrome.runtime.reload();
      }
    });
  };

  chrome.management.getSelf((self) => {
    if (self.installType === "development") {
      chrome.runtime.getPackageDirectoryEntry((dir: DirectoryEntry) =>
        watchChanges(dir)
      );

      chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        // NB: see https://github.com/xpl/crx-hotreload/issues/5
        if (tabs[0]) {
          chrome.tabs.reload(tabs[0].id);
        }
      });
    }
  });
})();

export {};
// export default reload;
