build: lib/html2jade.coffee
	coffee -c lib/html2jade.coffee

test: build
	./bin/html2jade test/data/*.html && git status -- test/data

untest:
	git checkout -- test/data
