using System;
using System.Drawing;
using System.Runtime.InteropServices;
using System.Threading;

namespace MouseMover
{
    class Program
    {
        // Importing necessary user32.dll methods for mouse movement
        [DllImport("user32.dll")]
        static extern bool SetCursorPos(int X, int Y);

        static void Main(string[] args)
        {
            Console.WriteLine("Press 'S' to start moving the mouse and 'E' to stop.");
            
            bool isRunning = false;

            // Listening for start and stop keys
            Thread keyListener = new Thread(() =>
            {
                while (true)
                {
                    if (Console.KeyAvailable)
                    {
                        var key = Console.ReadKey(true).Key;

                        if (key == ConsoleKey.S)
                        {
                            Console.WriteLine("Mouse movement started.");
                            isRunning = true;
                        }
                        else if (key == ConsoleKey.E)
                        {
                            Console.WriteLine("Mouse movement stopped.");
                            isRunning = false;
                        }
                    }
                }
            });
            keyListener.IsBackground = true;
            keyListener.Start();

            // Mouse movement loop
            Random random = new Random();
            while (true)
            {
                if (isRunning)
                {
                    // Generate random screen positions
                    int x = random.Next(0, 1920); // Replace 1920 with your screen width
                    int y = random.Next(0, 1080); // Replace 1080 with your screen height

                    // Move mouse to the generated position
                    SetCursorPos(x, y);

                    Console.WriteLine($"Mouse moved to: X={x}, Y={y}");

                    // Wait before moving again
                    Thread.Sleep(1000); // Adjust the interval (in milliseconds) as needed
                }
                else
                {
                    Thread.Sleep(100); // Prevent busy waiting
                }
            }
        }
    }
}