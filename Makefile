build:
	docker build -t react-example .

run:
	docker run -dp 80:80 react-example
