import React, { useState, useEffect } from 'react';
import { Clock, LogIn, LogOut, History, User, CloudSun, Calendar, Mail } from 'lucide-react';

interface TimeRecord {
  id: string;
  type: '出勤' | '退勤';
  timestamp: string;
}

function App() {
  const [records, setRecords] = useState<TimeRecord[]>(() => {
    const saved = localStorage.getItem('timeRecords');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    localStorage.setItem('timeRecords', JSON.stringify(records));
  }, [records]);

  const handleTimeRecord = (type: '出勤' | '退勤') => {
    const newRecord = {
      id: Date.now().toString(),
      type,
      timestamp: new Date().toISOString(),
    };
    setRecords(prev => [newRecord, ...prev]);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatRecordTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ja-JP', {
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-indigo-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-6 w-6" />
            <h1 className="text-xl font-bold">勤怠管理システム</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>従業員</span>
            </div>
            <div className="flex flex-col gap-2">
              <a
                href="https://miro.com/app/board/uXjVLn2Wixc=/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded transition-colors"
              >
                <Calendar className="h-5 w-5" />
                <span>カレンダー</span>
              </a>
              <a
                href="https://mail.google.com/mail/u/0/?ogbl#inbox"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 px-3 py-1 rounded transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>連絡</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-xl p-6 mb-8">
          <div className="text-center mb-8">
            <p className="text-4xl font-bold text-gray-800">
              {formatTime(currentTime)}
            </p>
            <p className="text-gray-600 mt-2">
              {currentTime.toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                weekday: 'long',
              })}
            </p>
            <div className="flex items-center justify-center gap-2 mt-2 text-gray-600">
              <CloudSun className="h-5 w-5" />
              <a 
                href="https://www.jma.go.jp/bosai/#area_type=class20s&area_code=3120101&pattern=forecast"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-indigo-600 transition-colors"
              >
                気象庁天気予報を確認
              </a>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            <button
              onClick={() => handleTimeRecord('出勤')}
              className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <LogIn className="h-5 w-5" />
              出勤
            </button>
            <button
              onClick={() => handleTimeRecord('退勤')}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
            >
              <LogOut className="h-5 w-5" />
              退勤
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-xl p-6">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5 text-gray-600" />
            <h2 className="text-xl font-bold text-gray-800">打刻履歴</h2>
          </div>
          <div className="divide-y divide-gray-200">
            {records.map(record => (
              <div
                key={record.id}
                className="py-3 flex items-center justify-between"
              >
                <span className={`px-3 py-1 rounded-full text-sm ${
                  record.type === '出勤' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {record.type}
                </span>
                <span className="text-gray-600">
                  {formatRecordTime(record.timestamp)}
                </span>
              </div>
            ))}
            {records.length === 0 && (
              <p className="text-gray-500 text-center py-4">
                打刻記録はありません
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;