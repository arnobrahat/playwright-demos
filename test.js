//push code to GitHub.
//more lines to the file

git init // initiate the git repository into the project folder
git ls -al // check all the hidden files in the project folder
// and check the .git folder is created or not.
git 
git status // check the status of the repository
git add  // git add follwed by the file name // add a specific file to the staging area
git add . // add all the files in the current directory to the staging area
git add -A // add all the files in the current directory and subdirectories to the staging area
git add -u // add all the modified and deleted files in the current directory to the staging area

git commit -m "first commit" test.js // commit the changes with a comment followed by the file name
git push -u origin main or master // push the changes to the remote repository branch
// if the branch name is main, use main instead of master
git branch -M main // rename the default branch to main 
git clone // clone the remote repository to the local machine
git remote -v // check the remote repository URL
git remote add origin <repository-url> // add the remote repository URL to the local repository
git remote remove origin // remove the remote repository URL from the local repository
git fetch // fetch the changes from the remote repository
git pull // pull the changes from the remote repository to the local repository
git log // check the commit history of the repository
git diff // check the differences between the working directory and the staging area
git diff --cached // check the differences between the staging area and the last commit
git reset HEAD // unstage the changes from the staging area
git reset --hard // discard all the changes in the working directory and staging area
git checkout <branch-name> // switch to a different branch
git branch <branch-name> // create a new branch
git checkout -b <branch-name> // create and switch to a new branch
git merge <branch-name> // merge the changes from the specified branch to the current branch
git rebase <branch-name> // rebase the current branch with the specified branch
git cherry-pick <commit-hash> // apply the changes from the specified commit to the current branch
git stash // stash the changes in the working directory
git stash apply // apply the stashed changes to the working directory
