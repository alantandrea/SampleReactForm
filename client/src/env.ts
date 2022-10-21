export interface IDF_ENV {
  env_builder: EnvBuilder;
}

export interface EnvBuilder {
  build_id: number;
  stack_name: string;
  built_by: string;
  client: string;
  base_web_url: string;
  environment: string;
}
