#
# class FtpStorage:
#
#     def connect(self):
#         print 'connect';
#
#     def __init__(self):
#         # TODO remove do not push!
#         username = 'experiments'
#         password = '3xp3rim3nts'
#         host = 'usatoday.upload.akamai.com'
#         host_path = '/17200/experiments/usatoday/responsive/data-tables/data'
#         print 'hey'

import ftplib
import os
import logging


def upload(host, username, password, host_path, file_path):
    try:
        file_name =  file_path[file_path.rindex('/')+1:]
        STOR_cmd = 'STOR %s' % file_name
        session = ftplib.FTP(host, username, password, host)
        session.cwd(host_path)
        file = open(file_path, 'rb')                  # file to send
        session.storbinary(STOR_cmd, file)     # send the file
        file.close()
        # close file and FTP
        session.quit()
    except Exception, e:
        logging.error(e.message)

def test_upload():
    username = os.environ['FTP_USER']
    password = os.environ['FTP_PASSWORD']
    host = 'usatoday.upload.akamai.com'
    host_path = '/17200/experiments/usatoday/responsive/data-tables/data'
    file_path = '/Users/plinders/Projects/toolkit/media/documents/sample_8XI2bgl.json'
    upload()