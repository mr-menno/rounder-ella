import React, { useState } from 'react';

import {
  Container,
  Segment,
  Input,
  Button,
  Message,
  Icon,
} from 'semantic-ui-react';

function BasicTens() {

  let [level,setLevel] = useState(1);
  let [answer,setAnswer] = useState('');
  let [answered,setAnswered] = useState(false);
  let [result,setResult] = useState(false);
  let [stats,setStats] = useState({questions:0,correct:0,wrong:0})

  let newQuestion = () => {
    if(answered>20) level=2;
    if(answered>40) level=3;

    let max=20;
    let mover=10;
    if(level===2) {
      max=50;
    }
    if(level===3) {
      max=200;
    }
    let add = Math.random()>0.5 ? true:false;
    let A = Math.floor(Math.random()*max);
    while(A<=10) A = Math.floor(Math.random()*max);
    let _A_teen = add ? Math.ceil(A/10)*10 : Math.floor(A/10)*10;
    let B = Math.floor(Math.random()*mover);
    console.log(A,B,_A_teen);
    while((add ? ((A+B<_A_teen) ? true : false) : ((A-B>_A_teen) ? true : false ) )) {
      B = Math.floor(Math.random()*mover);
    }

    let solve = Math.random()>0.5 ? false : true;
    let question=0; let answer=0;
    if(solve) {
      question = `${A} ${add?'+':'-'} __ = ${add ? A+B:A-B}`;
      answer = B;
    } else {
      question = `${A} ${add?'+':'-'} ${B} = __`;
      answer = add ? A+B : A-B;
    }

    return {
      // level: level,
      question: question,
      answer: answer,
      outcome: -1,
      level: level
    }
  }
  let [question,setQuestion] = useState(newQuestion())


  let checkQuestion = () => {
    setAnswered(true);
    if(parseInt(answer)===question.answer) {
      if(question.outcome===-1) {
        setQuestion({...question,outcome:0})
        if(stats.correct+1===20) setLevel(2);
        if(stats.correct+1===40) setLevel(3);
        setStats({...stats,correct:stats.correct+1,questions:stats.questions+1});
      }
      setResult(true)
      setTimeout(() => {
        setAnswered(false);
        setAnswer('');
        setQuestion(newQuestion());
      },1000)
    } else {
      if(question.outcome===-1) {
        setQuestion({...question,outcome:0})
        setStats({...stats,wrong:stats.wrong+1,questions:stats.questions+1});
      }
      setResult(false);
      setTimeout(() => {
        setAnswer('');
        setAnswered(false);
      },1000)
    }
    // setQuestion(newQuestion());
  }

  return (

    <Container>
        <Segment>
          <h3>solve the following<br />Level: {question.level}</h3>
        </Segment>
        <Segment>
          <h1>{question.question}</h1>
        </Segment>
        <Input type="number" pattern="\d*" value={answer.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} onChange={(e,data) => {
            setAnswer(data.value.replace(/,/g,''));
            // if(parseInt(data.value)===question.answer) {
            //   console.log(data.value,question.answer);
            //   checkQuestion(data.value);
            // }
          }}
          onKeyDown={(e) => { if(e.key === 'Enter') { checkQuestion() }}}
          placeholder='answer' fluid size="massive" focus={true} className="number-input"/>
        {answered ? (result ? <Message
          positive
          header='Nice work!'
        /> : <Message
          negative
          header='Try again' />) :
        <Button className='mt-1em mb-1em' fluid color="green" onClick={checkQuestion} size="huge">check</Button>}
        <Button.Group fluid className='mt-1em' >
          <Button primary icon labelPosition='left'>{stats.questions}<Icon name='hashtag' /></Button>
          <Button positive icon labelPosition='left'>{stats.correct}<Icon name='check' /></Button>
          <Button negative icon labelPosition='left'>{stats.wrong}<Icon name='close' /></Button>
        </Button.Group>
    </Container>
  );
}

export default BasicTens;
