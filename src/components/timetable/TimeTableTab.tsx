import TimeTableBanner from './TimeTableBanner';
import TimeTable from './TimeTable';

const TimeTableTab: React.FC = () => {
  return (
    <div className="flex flex-col">
      <TimeTableBanner />
      <div className="py-1 px-4">
        <TimeTable />
      </div>
    </div>
  );
};

export default TimeTableTab;