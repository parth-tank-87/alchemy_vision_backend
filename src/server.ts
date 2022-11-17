import { DataSource, DataSourceOptions } from "typeorm";

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres' 
};
const dataSource = new DataSource(dataSourceOptions);

export default dataSource;