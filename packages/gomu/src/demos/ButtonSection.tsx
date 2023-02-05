import { TbAward } from 'react-icons/tb';
import Button from '../components/Button';

const ButtonSection = () => {
  return (
    <section id="button">
      <h2>Button</h2>
      <h3>Button Mode</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button>Light Mode</Button>
        <Button mode="dark">Dark Mode</Button>
      </div>
      <h3>Button Variant</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="text">Text Button</Button>
        <Button>Solid Button</Button>
        <Button variant="outline">Outline Button</Button>
      </div>
      <h3>Button Disabled</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="text" disabled>
          Text Button
        </Button>
        <Button disabled>Solid Button</Button>
        <Button variant="outline" disabled>
          Outline Button
        </Button>
      </div>
      <h3>Button Icon</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button variant="text" leftIcon={<TbAward />}>
          Text Left Icon
        </Button>

        <Button variant="solid" leftIcon={<TbAward />}>
          Solid Left Icon
        </Button>

        <Button variant="solid" rightIcon={<TbAward />}>
          Solid Right Icon
        </Button>
      </div>

      <h3>Button Loading</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <Button variant="text" loading>
          Text Loading
        </Button>
        <Button loading>Solid Button</Button>
        <Button leftIcon={<TbAward />} loading>
          Button
        </Button>
        <Button leftIcon={<TbAward />} loadingText="Custom Loading Text" loading>
          Button
        </Button>
        <Button leftIcon={<TbAward />} loadingPosition="right" loading>
          Button Loading Right
        </Button>
        <Button leftIcon={<TbAward />} loadingPosition="center" loading>
          Button Loading Center
        </Button>
        <Button variant="outline" rightIcon={<TbAward />} loading>
          Outline Button
        </Button>
      </div>

      <h3>Button Size</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button size="xs">XS Button</Button>
        <Button size="sm">SM Button</Button>
        <Button size="md">MD Button</Button>
        <Button size="lg">LG Button</Button>
        <Button size="xl">XL Button</Button>
      </div>
      <h3>Button Radius</h3>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <Button radius="xs">XS Button</Button>
        <Button radius="sm">SM Button</Button>
        <Button radius="md">MD Button</Button>
        <Button radius="lg">LG Button</Button>
        <Button radius="xl">XL Button</Button>
      </div>
    </section>
  );
};

export default ButtonSection;
