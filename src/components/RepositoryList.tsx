import { FormEvent, useEffect, useState } from "react";
import { RepositoryItem } from "./RepositoryItem";

import "../styles/repositories.scss";

interface Repository {
  name: string;
  description: string;
  html_url: string;
}

export function RepositoryList() {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [repositoryName, setRepositoryName] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (repositoryName.length !== 0) {
      try {
        fetch(`https://api.github.com/users/${repositoryName}/repos`)
          .then((response) => response.json())
          .then((data) =>
            data.message === "Not Found"
              ? setRepositories([])
              : setRepositories(data)
          );
      } catch (e) {
        console.log(e);
      }
    }
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/niltonizaguirres/repos`)
      .then((response) => response.json())
      .then((data) => setRepositories(data));
  }, []);

  return (
    <div className="repository-list">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          value={repositoryName}
          onChange={(e) => setRepositoryName(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>
      <h1>📚 Lista de repositórios</h1>

      <ul>
        {repositories.length === 0 ? (
          <h2>Nenhum repositório encontrado</h2>
        ) : (
          repositories.map((repository) => (
            <RepositoryItem key={repository.name} repository={repository} />
          ))
        )}
      </ul>
    </div>
  );
}
