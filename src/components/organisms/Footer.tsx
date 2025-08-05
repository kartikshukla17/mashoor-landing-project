export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t bg-secondary dark:bg-primary py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-gray-600 dark:text-gray-400">
        © {year} Calvero. All rights reserved.
      </div>
    </footer>
  );
}