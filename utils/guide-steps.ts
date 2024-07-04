


export const steps = [
  {
    selector: '.input-step',
    content: 'Define or adjust the number of rows, columns, and gap settings.',
  },
  {
    selector: '.grid-step',
    content: 'Modify the grid layout by clicking on cells to resize and move items 🤯',
  },
  {
    selector: '.copy-step',
    content: 'Copy generated code in two formats: Tailwind and CSS Grid',
  },
  {
    selector: '.reset-step',
    content: 'Reset the grid to its default configuration.',
  },
  {
    selector: '.random-step',
    content: 'Generate random grid configurations for experimentation 🎲',
  },
  {
    selector: '.download-step',
    content: 'You can download the generated Grid as Image 🖼️',
  },
    {
      selector: '.responsive-step',
      content: 'Preview how the grid layout responds between mobile and desktop size and make your grid responsive!',
    },
  {
    selector: '.github-step',
    content: 'Explore the GitHub repository and contribute to this open-source project!',
  },
  {
    selector: '.website-step',
    content: 'You are ready!, you can discover more about me on my website 🌐',
    highlightedSelectors: ['[data-tut="reactour__highlighted"]'],
    mutationObservables: ['[data-tut="reactour__highlighted"]'],
  },
  {
    selector: '.buymecoffee-step',
    content: 'If you love this project, show your support by buying me a coffee! ☕️',
  },
];




export const styles = {
  badge: (base: any) => ({
    ...base,
    backgroundColor: '#e54d2e', 
    color: '#fff',
    padding: '0.5rem 1rem', 
    borderRadius: '2rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  })
};