import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';

export async function cancelNotification() {
  await notifee.cancelNotification('timer');
}

export async function displayNotifications(body: string, time: number) {
  const date = new Date(Date.now());
  date.setSeconds(date.getSeconds() + time);
  console.log(date);
  console.log(new Date(Date.now()));

  // Create a time-based trigger
  const trigger: TimestampTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: date.getTime(), // fire at 11:10am (10 minutes before meeting)
  };

  const channelId = await notifee.createChannel({
    id: 'timer',
    name: 'timerChannel',
  });

  await notifee.requestPermission();

  await notifee.createTriggerNotification(
    {
      id: 'timer',
      title: 'TodoList Timer',
      body: body,
      android: {
        channelId: channelId,
      },
    },
    trigger,
  );
}

