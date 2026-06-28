import HeroSection from '@/components/HeroSection';
import { useNavigationMenu } from '@/App';

const Index = () => {
  const { toggleMenu } = useNavigationMenu();

  return (
    <div className="min-h-screen bg-background">      
      <main>
        <div className="min-h-screen">
          <HeroSection onMenuClick={toggleMenu} />
        </div>
      </main>
    </div>
  );
};

export default Index;
