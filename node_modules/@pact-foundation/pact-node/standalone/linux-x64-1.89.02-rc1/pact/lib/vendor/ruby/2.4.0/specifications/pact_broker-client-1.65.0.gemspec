# -*- encoding: utf-8 -*-
# stub: pact_broker-client 1.65.0 ruby lib

Gem::Specification.new do |s|
  s.name = "pact_broker-client".freeze
  s.version = "1.65.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Beth Skurrie".freeze]
  s.date = "2022-06-24"
  s.description = "Client for the Pact Broker. Publish, retrieve and query pacts and verification results. Manage webhooks and environments.".freeze
  s.email = ["beth@bethesque.com".freeze]
  s.executables = ["pact-broker".freeze, "pactflow".freeze]
  s.files = ["bin/pact-broker".freeze, "bin/pactflow".freeze]
  s.homepage = "https://github.com/pact-foundation/pact_broker-client.git".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.0".freeze)
  s.rubygems_version = "2.6.14.4".freeze
  s.summary = "See description".freeze

  s.installed_by_version = "2.6.14.4" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_runtime_dependency(%q<httparty>.freeze, ["~> 0.18.1"])
      s.add_runtime_dependency(%q<term-ansicolor>.freeze, ["~> 1.7"])
      s.add_runtime_dependency(%q<table_print>.freeze, ["~> 1.5"])
      s.add_runtime_dependency(%q<thor>.freeze, ["< 2.0", ">= 0.20"])
      s.add_runtime_dependency(%q<rake>.freeze, ["~> 13.0"])
      s.add_runtime_dependency(%q<dig_rb>.freeze, ["~> 1.0"])
      s.add_development_dependency(%q<fakefs>.freeze, ["~> 0.4"])
      s.add_development_dependency(%q<webmock>.freeze, ["~> 3.0"])
      s.add_development_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
      s.add_development_dependency(%q<pact>.freeze, ["~> 1.16"])
      s.add_development_dependency(%q<pact-support>.freeze, ["~> 1.16"])
      s.add_development_dependency(%q<approvals>.freeze, ["= 0.0.18"])
      s.add_development_dependency(%q<rspec-its>.freeze, ["~> 1.3"])
    else
      s.add_dependency(%q<httparty>.freeze, ["~> 0.18.1"])
      s.add_dependency(%q<term-ansicolor>.freeze, ["~> 1.7"])
      s.add_dependency(%q<table_print>.freeze, ["~> 1.5"])
      s.add_dependency(%q<thor>.freeze, ["< 2.0", ">= 0.20"])
      s.add_dependency(%q<rake>.freeze, ["~> 13.0"])
      s.add_dependency(%q<dig_rb>.freeze, ["~> 1.0"])
      s.add_dependency(%q<fakefs>.freeze, ["~> 0.4"])
      s.add_dependency(%q<webmock>.freeze, ["~> 3.0"])
      s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
      s.add_dependency(%q<pact>.freeze, ["~> 1.16"])
      s.add_dependency(%q<pact-support>.freeze, ["~> 1.16"])
      s.add_dependency(%q<approvals>.freeze, ["= 0.0.18"])
      s.add_dependency(%q<rspec-its>.freeze, ["~> 1.3"])
    end
  else
    s.add_dependency(%q<httparty>.freeze, ["~> 0.18.1"])
    s.add_dependency(%q<term-ansicolor>.freeze, ["~> 1.7"])
    s.add_dependency(%q<table_print>.freeze, ["~> 1.5"])
    s.add_dependency(%q<thor>.freeze, ["< 2.0", ">= 0.20"])
    s.add_dependency(%q<rake>.freeze, ["~> 13.0"])
    s.add_dependency(%q<dig_rb>.freeze, ["~> 1.0"])
    s.add_dependency(%q<fakefs>.freeze, ["~> 0.4"])
    s.add_dependency(%q<webmock>.freeze, ["~> 3.0"])
    s.add_dependency(%q<conventional-changelog>.freeze, ["~> 1.3"])
    s.add_dependency(%q<pact>.freeze, ["~> 1.16"])
    s.add_dependency(%q<pact-support>.freeze, ["~> 1.16"])
    s.add_dependency(%q<approvals>.freeze, ["= 0.0.18"])
    s.add_dependency(%q<rspec-its>.freeze, ["~> 1.3"])
  end
end
