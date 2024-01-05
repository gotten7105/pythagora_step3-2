import platform
print(platform.uname())

from mymodels import Base #, User, Comment
from connect import engine

print("Creating tables >>> ")
Base.metadata.create_all(bind=engine)