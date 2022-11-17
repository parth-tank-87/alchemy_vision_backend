import { Subscriptions } from '../models';
import cron from 'node-cron';
import dataSource from '../server';

// Creating a cron job which runs on every 10 second
cron.schedule("*/60 * * * * *", async () => {
  const _repository = dataSource.getRepository(Subscriptions);
  const records = await _repository.find({ withDeleted: false });

  console.log('records: ', records);
});