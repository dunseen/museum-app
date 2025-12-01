import { ProfileForm } from './components/profile-form';

export default function Page() {
  return (
    <>
      <header className="mb-8">
        <h1 className="text-2xl font-bold">Perfil</h1>
        <p className="text-lg">atualizar informações do usuário.</p>
      </header>
      <ProfileForm />
    </>
  );
}
