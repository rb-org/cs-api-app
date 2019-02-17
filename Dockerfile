FROM python:3.7.2-slim

ENV APP_DIR=/usr/src/csapi

RUN groupadd -r csapi && \
  useradd -r -g csapi csapi && \
  mkdir -p $APP_DIR

WORKDIR $APP_DIR

COPY requirements.txt $APP_DIR/
COPY --chown=csapi:csapi ./csapi $APP_DIR/

# Install any needed packages specified in requirements.txt
RUN apt update && \
  apt install gcc -y && \
  apt install default-libmysqlclient-dev -y && \
  pip install -U pip && \
  pip install --trusted-host pypi.python.org -r requirements.txt

USER csapi

# Default Flask port
EXPOSE 5000

CMD ["python", "server.py"]
