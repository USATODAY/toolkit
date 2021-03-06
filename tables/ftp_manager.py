import ftplib
import os
import logging
from cStringIO import StringIO

host_path = '/17200/experiments/usatoday/responsive/data-tables/data'
username = os.environ['FTP_USER'] if 'FTP_USER' in os.environ else None
password = os.environ['FTP_PASSWORD'] if 'FTP_PASSWORD' in os.environ else None
host = 'usatoday.upload.akamai.com'


def upload(file_content=None, file_name=None, file_path=None):
    session = None
    try:
        logging.debug('Uploading %s' % file_name)
        if file_path is not None:
            file_content = open(file_path, 'rb')
        if file_name is None and file_path is not None:
            file_name =  file_path[file_path.rindex('/')+1:]
        if file_path is None and file_name is None:
            raise Exception('File Name is required when file path is not provided')
        if file_content is not None:
            file_content = StringIO(str(file_content))
        STOR_cmd = 'STOR %s' % file_name
        session = ftplib.FTP(host, username, password, host)
        session.cwd(host_path)                 # file to send
        session.storbinary(STOR_cmd, file_content)
        if file_path is not None:
            file.close()
        # close file and FTP
        session.quit()
    except Exception as e:
        logging.error(e.message)
        if session is not None:
            session.quit()


def delete(file_name):
    try:
        session = ftplib.FTP(host, username, password, host)
        session.cwd(host_path)
        session.delete(file_name)
        # close file and FTP
        session.quit()
    except Exception as e:
        logging.error(e.message)
