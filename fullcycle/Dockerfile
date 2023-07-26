FROM golang as builder
WORKDIR /app
COPY . /app
RUN go build -ldflags "-s -w" -o fullcycle main.go

FROM scratch
COPY --from=builder /app/fullcycle /app/fullcycle
CMD ["/app/fullcycle"]