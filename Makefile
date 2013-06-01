build: lib/html2jade.coffee
	coffee -c lib

test: build
	./cli.js test/data/*.html && git status -- test/data

untest:
	git checkout -- test/data
