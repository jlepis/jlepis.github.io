Jekyll::Hooks.register :site, :after_reset do |site|
  FileUtils.cp_r Dir.glob('functions/*'), site.config['destination']
end