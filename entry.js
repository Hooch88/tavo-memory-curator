tavo.plugin.onSidebarAction('open-memory-curator', () => {
  tavo.set('tavoMemoryCuratorOpen', {nonce: `${Date.now()}-${Math.random()}`}, 'chat');
});
