const uploadBtn = document.getElementById('upload-btn');
const inputUpload = document.getElementById('imagem-upload');

uploadBtn.addEventListener('click', () => {
  inputUpload.click();
});

function lerConteudoDoArquivo(arquivo) {
  return new Promise((resolve, reject) => {
    const leitor = new FileReader();

    leitor.onload = () => {
      resolve({ url: leitor.result, nome: arquivo.name });
    };

    leitor.onerror = () => {
      reject(`Erro na leitura do arquivo ${arquivo.name}`);
    };

    leitor.readAsDataURL(arquivo);
  });
}

const imagemPrincipal = document.querySelector('.main-imagem');
const nomeDaImagem = document.querySelector('.container-imagem-nome p');

inputUpload.addEventListener('change', async (evento) => {
  const arquivo = evento.target.files[0];

  if (arquivo) {
    try {
      const conteudoDoArquivo = await lerConteudoDoArquivo(arquivo);
      imagemPrincipal.src = conteudoDoArquivo.url;
      nomeDaImagem.textContent = conteudoDoArquivo.nome;
    } catch (erro) {
      console.error('Erro na leitura do arquivo');
    }
  }
});

const inputTags = document.getElementById('input-tags');
const listaTags = document.getElementById('lista-tags');

// Remove Tag
listaTags.addEventListener('click', (evento) => {
  if (evento.target.classList.contains('remove-tag')) {
    const tagQueQueremosRemover = evento.target.parentElement;
    listaTags.removeChild(tagQueQueremosRemover);
  }
});

const tagsDisponiveis = [
  'Front-end',
  'Programação',
  'Data Science',
  'Full-stack',
  'HTML',
  'CSS',
  'JavaScript',
  'Java',
];

async function verificaTagsDisponiveis(tagTexto) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tagsDisponiveis.includes(tagTexto));
    }, 1000);
  });
}

// Adiciona Tag
inputTags.addEventListener('keypress', async (evento) => {
  if (evento.key === 'Enter') {
    evento.preventDefault();
    const tagTexto = inputTags.value.trim();
    if (tagTexto !== '') {
      try {
        const tagExiste = await verificaTagsDisponiveis(tagTexto);
        if (tagExiste) {
          const tagNova = document.createElement('li');
          tagNova.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove-tag"/>`;
          listaTags.appendChild(tagNova);
          inputTags.value = '';
        } else {
          alert('Tag não foi encontrada!');
        }
      } catch (error) {
        console.error('Erro ao verificar a existência da tag');
        alert('Erro ao verificar a existência da tag.\nVerifique o console.');
      }
    }
  }
});

async function publicarProjeto(nomeDoProjeto, descricaoDoProjeto, tagsProjeto) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const deuCerto = Math.random() > 0.5;

      if (deuCerto) {
        resolve('Projeto publicado com sucesso');
      } else {
        reject('Erro ao publicar o projeto');
      }
    }, 2000);
  });
}

const botaoPublicar = document.querySelector('.botao-publicar');

botaoPublicar.addEventListener('click', async (evento) => {
  evento.preventDefault();

  const nomeDoProjeto = document.getElementById('nome').value;
  const descricaoDoProjeto = document.getElementById('descricao').value;
  const tagsProjeto = Array.from(listaTags.querySelectorAll('p')).map(
    (tag) => tag.textContent
  );

  try {
    const mensagem = await publicarProjeto(
      nomeDoProjeto,
      descricaoDoProjeto.tagsProjeto
    );
    console.log(mensagem);
    alert(mensagem);
  } catch (error) {
    console.error(error);
    alert(error);
  }
});
