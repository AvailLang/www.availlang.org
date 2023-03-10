# www.availlang.org
The Avail Foundation website

Everyone should already have a git repository for the website.  The best approach to point to the repository is to go to the command line.

1. In the terminal, navigate to the folder where your current repository lives.
2. Enter: $ git remote add new-origin https://github.com/AvailLang/www.availlang.org.git
3. Enter: $ git remote rm origin
4. Enter: $ git remote rename new-origin origin
5. Enter: $ git config branch.master.remote origin
6. Enter: $ git config branch.master.merge refs/heads/master

You should now be able to just type git pull and git push to access the new repository as your default.
