import { Layout } from '@/components/layout/Layout';
import { Hero } from '@/components/home/Hero';
import { ServiceCategories } from '@/components/home/ServiceCategories';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { CallToAction } from '@/components/home/CallToAction';

const Index = () => {
  return (
    <Layout>
      <Hero />
      <ServiceCategories />
      <WhyChooseUs />
      <CallToAction />
    </Layout>
  );
};

export default Index;