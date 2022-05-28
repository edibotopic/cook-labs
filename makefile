# update recipe list on website
git: populate
	git add .
	git commit -m "$m"
	# git push -u origin main

# update recipe list in code
populate: recipes
	cd recipes; ./popson.sh
