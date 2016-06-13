import tempfile
import win32api
# import win32print
import sys

GHOSTSCRIPT_PATH = "C:\\Program Files\\gs\\gs9.19\\bin\\gswin32.exe"
GSPRINT_PATH = "C:\\Program Files\\Ghostgum\\gsview\\gsprint.exe"

# YOU CAN PUT HERE THE NAME OF YOUR SPECIFIC PRINTER INSTEAD OF DEFAULT
# currentprinter = win32print.GetDefaultPrinter()

printer_name = sys.argv[1]
# paper_size = 'A4'

win32api.ShellExecute(0, 'open', GSPRINT_PATH, '-ghostscript "'+GHOSTSCRIPT_PATH+'" -printer "'+ printer_name +'" "pdf/document.pdf"', '.', 0)