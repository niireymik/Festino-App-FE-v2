import TablingBanner from '@/components/tabling/TablingBanner';
import TablingTaps from '@/components/tabling/TablingTaps';

const TablingPage: React.FC = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <TablingBanner />
        <TablingTaps />
      </div>
    </>
  );
};

export default TablingPage;
