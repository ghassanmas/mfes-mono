# -*- encoding: utf-8 -*-
# stub: pact 1.62.0 ruby lib

Gem::Specification.new do |s|
  s.name = "pact".freeze
  s.version = "1.62.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/pact-foundation/pact-ruby/issues", "changelog_uri" => "https://github.com/pact-foundation/pact-ruby/blob/master/CHANGELOG.md", "documentation_uri" => "https://github.com/pact-foundation/pact-ruby/blob/master/README.md", "source_code_uri" => "https://github.com/pact-foundation/pact-ruby" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["James Fraser".freeze, "Sergei Matheson".freeze, "Brent Snook".freeze, "Ronald Holshausen".freeze, "Beth Skurrie".freeze]
  s.date = "2022-02-21"
  s.description = "Enables consumer driven contract testing, providing a mock service and DSL for the consumer project, and interaction playback and verification for the service provider project.".freeze
  s.email = ["james.fraser@alumni.swinburne.edu".freeze, "sergei.matheson@gmail.com".freeze, "brent@fuglylogic.com".freeze, "uglyog@gmail.com".freeze, "bskurrie@dius.com.au".freeze]
  s.executables = ["pact".freeze]
  s.files = ["bin/pact".freeze]
  s.homepage = "https://github.com/pact-foundation/pact-ruby".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0".freeze)
  s.rubygems_version = "2.6.14.4".freeze
  s.summary = "Enables consumer driven contract testing, providing a mock service and DSL for the consumer project, and interaction playback and verification for the service provider project.".freeze

  s.installed_by_version = "2.6.14.4" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_runtime_dependency(%q<rack-test>.freeze, ["< 2.0.0", ">= 0.6.3"])
      s.add_runtime_dependency(%q<thor>.freeze, ["< 2.0", ">= 0.20"])
      s.add_runtime_dependency(%q<webrick>.freeze, ["~> 1.3"])
      s.add_runtime_dependency(%q<term-ansicolor>.freeze, ["~> 1.0"])
      s.add_runtime_dependency(%q<pact-support>.freeze, [">= 1.16.9", "~> 1.16"])
      s.add_runtime_dependency(%q<pact-mock_service>.freeze, [">= 3.3.1", "~> 3.0"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 13.0"])
      s.add_development_dependency(%q<webmock>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<fakefs>.freeze, ["= 0.5"])
      s.add_development_dependency(%q<hashie>.freeze, ["~> 2.0"])
      s.add_development_dependency(%q<activesupport>.freeze, ["~> 5.2"])
      s.add_development_dependency(%q<faraday>.freeze, ["~> 0.13"])
      s.add_development_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
      s.add_development_dependency(%q<bump>.freeze, ["~> 0.5"])
      s.add_development_dependency(%q<pact-message>.freeze, ["~> 0.8"])
      s.add_development_dependency(%q<rspec-its>.freeze, ["~> 1.3"])
    else
      s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
      s.add_dependency(%q<rack-test>.freeze, ["< 2.0.0", ">= 0.6.3"])
      s.add_dependency(%q<thor>.freeze, ["< 2.0", ">= 0.20"])
      s.add_dependency(%q<webrick>.freeze, ["~> 1.3"])
      s.add_dependency(%q<term-ansicolor>.freeze, ["~> 1.0"])
      s.add_dependency(%q<pact-support>.freeze, [">= 1.16.9", "~> 1.16"])
      s.add_dependency(%q<pact-mock_service>.freeze, [">= 3.3.1", "~> 3.0"])
      s.add_dependency(%q<rake>.freeze, ["~> 13.0"])
      s.add_dependency(%q<webmock>.freeze, ["~> 3.0"])
      s.add_dependency(%q<fakefs>.freeze, ["= 0.5"])
      s.add_dependency(%q<hashie>.freeze, ["~> 2.0"])
      s.add_dependency(%q<activesupport>.freeze, ["~> 5.2"])
      s.add_dependency(%q<faraday>.freeze, ["~> 0.13"])
      s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
      s.add_dependency(%q<bump>.freeze, ["~> 0.5"])
      s.add_dependency(%q<pact-message>.freeze, ["~> 0.8"])
      s.add_dependency(%q<rspec-its>.freeze, ["~> 1.3"])
    end
  else
    s.add_dependency(%q<rspec>.freeze, ["~> 3.0"])
    s.add_dependency(%q<rack-test>.freeze, ["< 2.0.0", ">= 0.6.3"])
    s.add_dependency(%q<thor>.freeze, ["< 2.0", ">= 0.20"])
    s.add_dependency(%q<webrick>.freeze, ["~> 1.3"])
    s.add_dependency(%q<term-ansicolor>.freeze, ["~> 1.0"])
    s.add_dependency(%q<pact-support>.freeze, [">= 1.16.9", "~> 1.16"])
    s.add_dependency(%q<pact-mock_service>.freeze, [">= 3.3.1", "~> 3.0"])
    s.add_dependency(%q<rake>.freeze, ["~> 13.0"])
    s.add_dependency(%q<webmock>.freeze, ["~> 3.0"])
    s.add_dependency(%q<fakefs>.freeze, ["= 0.5"])
    s.add_dependency(%q<hashie>.freeze, ["~> 2.0"])
    s.add_dependency(%q<activesupport>.freeze, ["~> 5.2"])
    s.add_dependency(%q<faraday>.freeze, ["~> 0.13"])
    s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
    s.add_dependency(%q<bump>.freeze, ["~> 0.5"])
    s.add_dependency(%q<pact-message>.freeze, ["~> 0.8"])
    s.add_dependency(%q<rspec-its>.freeze, ["~> 1.3"])
  end
end
