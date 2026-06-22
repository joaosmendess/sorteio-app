# Decide a Roleta 🎡

Uma aplicação web para sorteio de decisões usando uma roleta interativa. Mobile-first, responsiva e genérica — funciona para qualquer tipo de sorteio: restaurantes, filmes, atividades, etc.

## ✨ Características

- 🎯 **Genérico** - Sorteie o que quiser: comida, filme, atividade, pessoa, etc
- 📱 **Mobile-First** - Otimizado para celular com design responsivo
- 💻 **Desktop Ready** - Layout completo e elegante em desktops
- 🎨 **Design Moderno** - Interface limpa e intuitiva
- ✨ **Animações** - Spinning wheel, confetti, pop animations
- 🌐 **PWA** - Funciona offline, pode adicionar à tela inicial
- 📊 **Sem Backend** - Tudo funciona no navegador (localStorage)

## 🚀 Começar

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

Abra [http://localhost:5173](http://localhost:5173) no navegador.

## 📖 Como Usar

1. **Criar Categorias** - Digite um nome (ex: "Cinema", "Comida")
2. **Adicionar Opções** - Adicione até 3 opções por categoria
3. **Girar a Roleta** - Clique em "Sortear" e veja a magia acontecer!
4. **Ver Resultado** - A opção sorteada aparece em um modal bonito

## 🏗️ Estrutura

```
src/
├── App.jsx              # Component principal com lógica de estado
├── components/
│   ├── BuildScreen.jsx  # Tela de criar categorias e opções
│   ├── WheelScreen.jsx  # Tela da roleta
│   ├── ResultModal.jsx  # Modal com resultado
│   └── icons.jsx        # SVG icons
└── App.css              # Estilos responsivos
```

## 🎨 Design

- **Cores**: Paleta quente com accent #E0542E
- **Tipografia**: Bricolage Grotesque + Schibsted Grotesk
- **Breakpoints**:
  - Mobile: até 639px
  - Tablet: 640px - 1023px
  - Desktop: 1024px+

## 🔧 Tecnologias

- React 18
- Vite
- CSS3 (animations, grid, flexbox)
- PWA (Service Worker, Manifest)

## 📝 Licença

MIT

